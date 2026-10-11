#!/usr/bin/env python3
"""Create portable GPL device bundles using only Python's standard library."""
from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parents[1]
out = root / 'release' / 'public'
out.mkdir(parents=True, exist_ok=True)
releases = [
    ('Spectra-Cube-Automation-0.1.6', 'cube-automation-v0.1.6', 'spectra-cube-automation',
     ['Spectra Cube Automation.amxd', 'Spectra Cube Automation.maxpat', 'spectra-cube-automation-controller-0.1.6.js', 'spectra-cube-automation-ui-0.1.6.js'],
     ['scripts/build-automation.cjs', 'devices/spectra-cube/core.js', 'devices/spectra-cube/automation-controller.js', 'devices/spectra-cube/automation-ui.js', 'tests/automation.cjs']),
    ('Session-Stem-Collector-0.1.0', 'stem-collector-v0.1.0', 'stem-collector',
     ['Session Stem Collector.amxd', 'Session Stem Collector.maxpat', 'controller.js'],
     ['scripts/build-stem-collector.cjs', 'devices/stem-collector/controller.js', 'tests/stem-collector.cjs']),
]
manifest = []
for name, tag, folder, files, sources in releases:
    device = root / 'devices' / folder
    patch = json.loads((device / files[0]).read_bytes()[32:])['patcher']
    for box in patch['boxes']:
        b = box['box']
        if b.get('text', '').startswith('js '):
            assert '/Volumes/' not in b['text'] and '/Users/' not in b['text'], 'Absolute script path in public device'
        assert not b.get('filename', '').startswith('/'), 'Absolute UI path in public device'
    for entry in patch['dependency_cache']:
        assert not entry.get('bootpath', '').startswith('/'), 'Absolute dependency path'
    archive = out / (name + '.zip')
    with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as z:
        for file in files:
            z.write(device / file, name + '/' + file)
        readme = (device / 'README.md').read_text().replace('../../LICENSE', 'LICENSE').replace('../../docs/images/', 'images/')
        z.writestr(name + '/README.md', readme)
        screenshot = 'cube-automation-0.1.6.png' if folder == 'spectra-cube-automation' else 'stem-collector-0.1.0.png'
        z.write(root / 'docs/images' / screenshot, name + '/images/' + screenshot)
        z.write(root / 'LICENSE', name + '/LICENSE')
        z.writestr(name + '/SOURCE.txt', 'GPL-3.0-only. Editable source, build scripts and tests:\nhttps://github.com/mnicholas7/max-for-live-devices/tree/' + tag + '\nThe source/ directory contains this device\'s build inputs. Run its build script from that directory.\n')
        for source in sources:
            z.write(root / source, name + '/source/' + source)
        z.write(root / 'LICENSE', name + '/source/LICENSE')
        # The automation test inspects the built portable patch in this path.
        for file in files:
            if 'devices/' + folder + '/' + file in sources:
                continue
            z.write(device / file, name + '/source/devices/' + folder + '/' + file)
    with zipfile.ZipFile(archive) as z:
        assert z.testzip() is None
        assert not any('Local.amxd' in entry for entry in z.namelist())
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    (out / (name + '.sha256')).write_text(digest + '  ' + archive.name + '\n')
    manifest.append({'device': name, 'tag': tag, 'archive': archive.name, 'sha256': digest, 'bytes': archive.stat().st_size})
    print(archive)
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
