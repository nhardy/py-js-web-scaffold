from ..base import BaseModel
from ..href import HrefModel


class AuthorModel(BaseModel):
  def init(self):
    self.add_property('name')
    self.add_model_property('link', HrefModel)
