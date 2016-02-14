from ..base import BaseModel


class ArticleModel(BaseModel):
  def init(self):
    self.add_property('type', 'article', False)
    self.add_property('title')
    self.add_array_property('authors')
    self.add_property('publish_date')
    self.add_property('display_publish_date', False)
    self.add_property('modified_date')
    self.add_property('display_modified_date', False)
    self.add_array_property('content')

