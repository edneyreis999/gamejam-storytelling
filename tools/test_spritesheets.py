import tempfile
import unittest
from pathlib import Path

from PIL import Image, ImageDraw

from spritesheets import export, inspect


class SpritesheetTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory(dir=Path(__file__).resolve().parent)
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.source = self.root / 'source.png'
        image = Image.new('RGBA', (300, 480))
        draw = ImageDraw.Draw(image)
        for row in range(4):
            for col in range(3):
                left, top = col * 100 + 30, row * 120 + 10
                draw.rectangle((left, top, left + 35, top + 85), fill=(150, 110, 60, 255))
                draw.rectangle((left + col * 8, top + 80, left + col * 8 + 8, top + 95), fill=(50, 30, 15, 255))
        image.save(self.source)

    def test_export_preserves_source_and_has_twelve_framed_cells(self):
        before = self.source.read_bytes()
        target = self.root / 'final.png'
        report = export(self.source, target, 48)
        self.assertEqual(self.source.read_bytes(), before)
        self.assertEqual(report['erros'], [])
        self.assertEqual(report['dimensoes'], [120, 220])
        self.assertEqual(len(report['celulas']), 12)
        self.assertEqual({c['limites'][3] for c in report['celulas']}, {53})

    def test_existing_version_is_not_overwritten(self):
        target = self.root / 'existing.png'
        target.write_bytes(b'preserve')
        with self.assertRaisesRegex(ValueError, 'já existe'):
            export(self.source, target, 48)
        self.assertEqual(target.read_bytes(), b'preserve')

    def test_clipped_source_is_rejected(self):
        with Image.open(self.source) as image:
            image.putpixel((0, 0), (100, 60, 30, 255))
            image.save(self.source)
        with self.assertRaisesRegex(ValueError, 'borda externa'):
            export(self.source, self.root / 'bad.png', 48)

    def test_wrong_grid_is_rejected(self):
        with Image.open(self.source) as image:
            image.crop((0, 0, 300, 240)).save(self.source)
        with self.assertRaisesRegex(ValueError, 'quatro faixas'):
            export(self.source, self.root / 'bad.png', 48)

    def test_opaque_final_does_not_pass(self):
        target = self.root / 'opaque.png'
        Image.new('RGB', (120, 220), 'black').save(target)
        self.assertTrue(any('alfa' in error for error in inspect(target)['erros']))


if __name__ == '__main__':
    unittest.main()
