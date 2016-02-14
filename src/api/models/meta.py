from .base import BaseModel


class MetaModel(BaseModel):
  def init(self):
    self.add_property('title')
