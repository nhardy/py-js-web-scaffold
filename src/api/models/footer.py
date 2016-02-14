from .base import BaseModel


class FooterModel(BaseModel):
  def init(self):
    self.add_property('copyright')
