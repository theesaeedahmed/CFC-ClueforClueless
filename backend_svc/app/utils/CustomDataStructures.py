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
    score: float

    def toDict(self):
        return {
            "institution": self.institution,
            "course": self.course,
            "specialization": self.specialization,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "score": self.score,
        }


@dataclass
class Skill:
    name: str
    level: str

    def toDict(self):
        return asdict(self)


@dataclass
class Social:
    name: str
    url: str

    def toDict(self):
        return asdict(self)


@dataclass
class Language:
    name: str
    level: str

    def toDict(self):
        return asdict(self)


@dataclass
class Course:
    _id: ObjectId
    progress: float
    started_at: date
    completed_at: Optional[date]
    course_type: str

    def toDict(self):
        return {
            "_id": str(self._id),  # Convert ObjectId to string for serialization
            "progress": self.progress,
            "started_at": self.started_at.isoformat(),
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "course_type": self.course_type,
        }


@dataclass
class Roadmap:
    # Add fields for Roadmap object as needed

    def toDict(self):
        return asdict(self)
