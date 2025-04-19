def create_indexes(db):
    """Create necessary indexes for MongoDB collections"""
    # Create index on userId for faster queries
    db.roadmaps.create_index("userId")

    # Create index on lastModified for sorting
    db.roadmaps.create_index("lastModified")
