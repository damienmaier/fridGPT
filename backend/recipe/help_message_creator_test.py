from .help_message_creator import create_help_message_for_step

import unittest


class HelpMessageCreatorTest(unittest.TestCase):

    def test_create_help_message(self):

        recipe_steps = [
            "Cuire les pâtes selon les instructions sur l'emballage.",
            "Pendant ce temps, laver et couper les légumes en petits morceaux.",
            "Faire chauffer l'huile d'olive dans une poêle et faire revenir les légumes jusqu'à ce qu'ils soient tendres.",
            "Ajouter les épices de l'armoire à épices complète et mélanger.",
            "Égoutter les pâtes cuites et les ajouter à la poêle avec les légumes.",
            "Mélanger le tout doucement pour bien enrober les pâtes de légumes.",
            "Servir chaud et déguster !"
        ]

        help_message = create_help_message_for_step(recipe_steps, 2)

        self.assertTrue(10 <= len(help_message) <= 500)
