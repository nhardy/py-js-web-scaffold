from src.api.models.page import PageModel
from src.api.models.header import HeaderModel
from src.api.models.article import ArticleModel
from src.api.models.article.author import AuthorModel
from src.api.models.footer import FooterModel
from src.api.models.link import LinkModel
from src.api.models.paragraph import ParagraphModel
from src.api.models.text import TextModel


header = HeaderModel({
  'title': 'Website Name',
  'tagline': 'Tagline',
  'links': [
    LinkModel({
      'label': 'Home',
      'href': '/',
    }),
    LinkModel({
      'label': 'About',
      'href': '/about',
    }),
    LinkModel({
      'label': 'Projects',
      'href': '/projects',
      'children': [
        LinkModel({
          'label': 'Web Scaffold',
          'href': '/projects/web-scaffold',
        })
      ]
    }),
    LinkModel({
      'label': 'GitHub',
      'href': 'https://www.github.com/nhardy/web-scaffold',
      'target': '_blank',
    })
  ]
})

footer = FooterModel({
  'copyright': '2016 Nathan Hardy'
})

author = AuthorModel({
  'name': 'Nathan Hardy',
  'link': {
    'href': 'http://nhardy.id.au/'
  }
})

PAGES = {
  '/': PageModel({
    'meta': {
      'title': 'Home'
    },
    'header': header,
    'content': [
      ArticleModel({
        'title': 'Home',
        'authors': [
          author
        ],
        'content': [
          ParagraphModel({
            'content': [
              TextModel('''This is the content of the first paragraph.''')
            ]
          }),
          ParagraphModel({
            'content': [
              TextModel('''This is the content of the second paragraph.''')
            ]
          }),
        ]
      })
    ],
    'footer': footer,
  }),
  '/about': PageModel()
}
