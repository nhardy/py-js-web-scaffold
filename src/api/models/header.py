from .base import BaseModel


class HeaderModel(BaseModel):
  def init(self):
    self.add_property('title')
    self.add_property('tagline')
    self.add_array_property('links')
