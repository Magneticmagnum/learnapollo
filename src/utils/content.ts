import {Parser, Node} from 'commonmark'

class Chapter {
  title: string
  alias: string
  subchapters: Subchapter[]

  constructor(title: string, alias: string, subchaptersData: SubchapterData[]) {
    this.title = title
    this.alias = alias
    this.subchapters = subchaptersData.map((d) => new Subchapter(d.title, d.alias, this))
  }
}

interface SubchapterData {
  title: string
  alias: string
}

const parser = new Parser()

class Subchapter {
  title: string
  alias: string
  chapter: Chapter

  constructor(title: string, alias: string, chapter: Chapter) {
    this.title = title
    this.alias = alias
    this.chapter = chapter
  }

  ast(): Node {
    return parser.parse(require(`../../content/${this.chapter.alias}/${this.alias}.md`))
  }
}

export const chapters: Chapter[] = [
  new Chapter('Overview', 'introduction', [{
    title: 'Introduction',
    alias: 'introduction',
  }, {
    title: 'Get Started',
    alias: 'get-started',
  }]),
  new Chapter('React Tutorial', 'tutorial-react', [{
    title: '01 - Getting Started',
    alias: 'react-01',
  }, {
    title: '02 - Basic Queries',
    alias: 'react-02',
  }, {
    title: '03 - Advanced Queries',
    alias: 'react-03',
  }, {
    title: '04 - Fragments',
    alias: 'react-04',
  }, {
    title: '05 - Basic Mutations',
    alias: 'react-05',
  }, {
    title: '06 - Multiple Mutations',
    alias: 'react-06',
  }]),
  new Chapter('React Native Tutorial', 'tutorial-react-native', [{
    title: '01 - Getting Started',
    alias: 'rn-01',
  }, {
    title: '02 - Basic Queries',
    alias: 'rn-02'
  }, {
    title: '03 - Advanced Queries',
    alias: 'rn-03',
  }]),
  new Chapter('Excursions', 'excursions', [{
    title: '01 - Using the DevTools',
    alias: 'excursion-01',
  }, {
    title: '02 - Mutation Results',
    alias: 'excursion-02',
  }]),
  new Chapter('Go Further', 'go-further', [{
    title: 'Wrap Up',
    alias: 'wrap-up',
  }]),
]

export const subchapters: Subchapter[] = chapters.map((c) => c.subchapters).reduce((acc, s) => acc.concat(s), [])

export function neighboorSubchapter(currentSubchapterAlias: string, forward: boolean): Subchapter | null {
  const currentIndex = subchapters.findIndex((s) => s.alias === currentSubchapterAlias)

  if (forward && currentIndex + 1 <= subchapters.length) {
    return subchapters[currentIndex + 1]
  } else if (!forward && currentIndex >= 1) {
    return subchapters[currentIndex - 1]
  }

  return null
}

export function getLastSubchapterAlias(subchapterAliases: string[]): string {
  let lastFinding = subchapterAliases[0]
  for (let i = 0; i < subchapters.length; i++) {
    if (subchapterAliases.includes(subchapters[i].alias)) {
      lastFinding = subchapters[i].alias
    }
  }
  return lastFinding
}
