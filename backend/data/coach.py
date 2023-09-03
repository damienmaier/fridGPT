import dataclasses
import json
import pathlib


@dataclasses.dataclass
class Coach:
    name: str
    description: str
    imageUrl: str

    def as_dict(self):
        return dataclasses.asdict(self)

    @staticmethod
    def read_coaches() -> dict[str, 'Coach']:
        with open(pathlib.Path(__file__).parent / 'coaches.json', encoding='utf-8') as f:
            return {data['name']: Coach(**data) for data in json.load(f)}


COACHES = Coach.read_coaches()
