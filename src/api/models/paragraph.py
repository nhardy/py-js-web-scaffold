from .base import BaseModel


class ParagraphModel(BaseModel):
  def init(self):
    self.add_property('type', 'paragraph', False)
    self.add_array_property('content')
