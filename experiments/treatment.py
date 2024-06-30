def map_range(value, old_min=0, old_max=5, new_min=0, new_max=255):
    """
    Maps a value from the old range to the new range.

    Args:
        value (float): The value to be mapped.
        old_min (float): Minimum value of the old range.
        old_max (float): Maximum value of the old range.
        new_min (float): Minimum value of the new range.
        new_max (float): Maximum value of the new range.

    Returns:
        float: The mapped value in the new range.
    """
    return (value - old_min) * (new_max - new_min) / (old_max - old_min) + new_min


# Example usage:
values_to_map = [0.5 + i * 1.125 for i in range(5)]
print(f"Values to map: {values_to_map}")

mapped_values = [round(map_range(value)) for value in values_to_map]
print(f"Mapped values: {mapped_values}")