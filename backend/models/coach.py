import dataclasses
import json

import root


@dataclasses.dataclass
class Coach:
    name: str
    description: str
    image_url: str

    def as_dict(self):
        return dataclasses.asdict(self)

    @staticmethod
    def read_coaches() -> dict[str, 'Coach']:
        with open(root.PROJECT_ROOT_PATH / 'data' / 'coaches.json', encoding='utf-8') as f:
            return {
                data['name']: Coach(data['name'], data['description'], data['image_url'])
                for data in json.load(f)
            }