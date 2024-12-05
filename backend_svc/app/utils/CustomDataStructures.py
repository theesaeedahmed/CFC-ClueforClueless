from dataclasses import dataclass, asdict
from typing import Optional
from datetime import date
from bson import ObjectId


@dataclass
class Education:
    institution: str
    course: str
    specialization: str
    start_date: date
    end_date: date
    _score: float

    def __post_init__(self):
        if not self.institution or not self.course:
            raise ValueError(f"Institution and course in Education cannot be empty or None. Exception raised for {self.institution}")

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not 0 <= value <= 100:
            raise ValueError("Score must be between 0 and 100")
        self._score = round(value, 2)

    def toDict(self):
        return {
            "institution": self.institution,
            "course": self.course,
            "specialization": self.specialization,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "score": self._score,
        }


@dataclass
class Skill:
    name: str
    level: str

    def __post_init__(self):
        if not self.name or not self.level:
            raise ValueError(f"Name and level in Skill cannot be empty or None. Exception raised for {self.name}")

    def toDict(self):
        return asdict(self)


@dataclass
class Social:
    name: str
    url: str

    def __post_init__(self):
        if not self.name or not self.url:
            raise ValueError(f"Name and url in Social cannot be empty or None. Exception raised for {self.name}")

    def toDict(self):
        return asdict(self)


@dataclass
class Language:
    name: str
    level: str

    def __post_init__(self):
        if not self.name or not self.level:
            raise ValueError(f"Name and level in Language cannot be empty or None. Exception raised for {self.name}")

    def toDict(self):
        return asdict(self)


@dataclass
class Course:
    _id: ObjectId
    _progress: float
    started_at: date
    completed_at: Optional[date]
    course_type: str  # "activated" or "bought"

    def __post_init__(self):
        if self.course_type not in ["activated", "bought"]:
            raise ValueError("Invalid course type. Must be either 'activated' or 'bought'.")

    @property
    def progress(self):
        return self._progress

    @progress.setter
    def progress(self, value):
        if value is None:
            raise ValueError(f"Progress in Course cannot be None. Exception raised for {self._id}")
        if not 0 <= value <= 100:
            raise ValueError(f"Progress must be between 0 and 100. Exception raised for {self._id}")
        self._progress = round(value, 2)

    def toDict(self):
        return {
            "_id": str(self._id),  # Convert ObjectId to string for serialization
            "progress": self._progress,
            "started_at": self.started_at.isoformat(),
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "course_type": self.course_type,
        }


@dataclass
class Roadmap:
    # Add fields for Roadmap object as needed

    def toDict(self):
        return asdict(self)
