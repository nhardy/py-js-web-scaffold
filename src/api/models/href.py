from .base import BaseModel


class HrefModel(BaseModel):
  def init(self):
    self.add_property('href')
    self.add_property('target')
