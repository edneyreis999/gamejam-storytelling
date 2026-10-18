import unittest

import numpy as np
from PIL import Image, ImageDraw

from corrigir_movimento import displace_upper, profile_leg, frame
from spritesheets import active_sheet


class MovementTests(unittest.TestCase):
    def test_both_hands_move_in_opposite_directions_without_disappearing(self):
        source = Image.new('RGBA', (40, 55))
        draw = ImageDraw.Draw(source)
        draw.rectangle((14, 30, 25, 44), fill=(80, 60, 40, 255))
        draw.rectangle((10, 36, 13, 40), fill=(255, 0, 0, 255))
        draw.rectangle((23, 36, 26, 40), fill=(0, 255, 0, 255))
        rig = dict(shoulder=30, hand=39, arms=[[12, 24]]*4)
        frames = [np.asarray(displace_upper(source, rig, 1, phase)) for phase in (1, -1)]
        movements = []
        for color in [(255, 0, 0, 255), (0, 255, 0, 255)]:
            centers = []
            for pixels in frames:
                yy, xx = np.nonzero(np.all(pixels == color, axis=2))
                self.assertGreaterEqual(len(xx), 8)
                centers.append(xx.mean())
            movements.append(centers[1]-centers[0])
        self.assertLess(movements[0]*movements[1], 0)

    def test_profile_boot_moves_without_being_recolored_or_sheared(self):
        source = Image.new('RGBA', (40, 55))
        draw = ImageDraw.Draw(source)
        draw.rectangle((15, 43, 25, 48), fill=(110, 80, 50, 255))
        boot_color = (20, 100, 200, 255)
        draw.rectangle((10, 49, 17, 52), fill=boot_color)
        centers = []
        for target in (14, 26):
            leg = np.asarray(profile_leg(source, source, 44, 20, 0, target, 3))
            yy, xx = np.nonzero(np.all(leg == boot_color, axis=2))
            self.assertEqual(len(xx), 32)
            self.assertEqual(int(xx.max()-xx.min()), 7)
            self.assertEqual(int(yy.max()), 52)
            centers.append(xx.mean())
        self.assertEqual(centers[1]-centers[0], 12)

    def test_gallery_shows_revision_instead_of_previous_approved_file(self):
        entry = dict(estado='aguarda_aprovacao', arquivo_final='approved.png', arquivo_candidato='revision.png')
        self.assertEqual(active_sheet(entry), 'revision.png')
        entry['estado'] = 'aprovado'
        self.assertEqual(active_sheet(entry), 'approved.png')

    def test_weapon_tip_below_waist_is_not_cut_with_the_legs(self):
        source = Image.new('RGBA', (40, 55))
        draw = ImageDraw.Draw(source)
        draw.rectangle((14, 30, 25, 52), fill=(100, 70, 40, 255))
        color = (150, 200, 250, 255)
        draw.rectangle((28, 44, 29, 45), fill=color)
        rig = dict(shoulder=30, hand=40, arms=[[11, 25]]*4, legs=[44]*4,
                   keep=[[[28, 44, 30, 46]], [], [], []])
        for phase in (1, -1):
            result = frame(source, rig, 0, phase, source)
            self.assertEqual(result.getpixel((29, 46)), color)


if __name__ == '__main__':
    unittest.main()
