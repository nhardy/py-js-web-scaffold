from .base import BaseModel
from .meta import MetaModel
from .header import HeaderModel
from .footer import FooterModel


class PageModel(BaseModel):
  def init(self):
    self.add_model_property('meta', MetaModel)
    self.add_model_property('header', HeaderModel)
    self.add_array_property('content')
    self.add_model_property('footer', FooterModel)
