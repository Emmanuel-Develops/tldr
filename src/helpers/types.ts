type Feed = {
  id: string;
  title: string;
  updatedAt: string;
  authors: Record<string, string[]>;
  generatedUrl?: string;
  entry: EntryData;
};

type AuthorData = {
  name: string;
  date: string;
  time: string;
}
type FeedPage = {
  id: string;
  title: string;
  updatedAt: string;
  authors: AuthorData[];
  historyLinks?: string[];
  generatedUrl?: string;
  entry: EntryData;
};

type EntryData = {
  id: string;
  title: string;
  updatedAt: string;
  link?: string;
  summary: string;
  published: string;
};

type ConvertedXML = {
  data: FeedPage;
  month: string;
  year: number;
  path: string | undefined;
}

type MailingListType = typeof BITCOINDEV | typeof LIGHTNINGDEV;

export const BITCOINDEV = "bitcoin-dev";
export const LIGHTNINGDEV = "lightning-dev";

type SearchIndexData = {
  title: string;
  authors: string[];
  summary: string;
  updatedAt: string;
  startedBy: string;
  path: string;
  score: number;
};

type SearchDataParams = {
  path?: string;
  query: {
    keyword?: string;
    author?: string;
  };
  relevance?: "old-new" | "new-old";
};

type HomepageEntryData = {
  id: string;
  title: string;
  link: string;
  authors: string[];
  published_at: string;
  summary: string;
  n_threads: number;
  dev_name: string;
  contributors: string[];
  file_path: string;
};

type HomepageData = {
  header_summary: string;
  recent_posts: HomepageEntryData[];
  active_posts: HomepageEntryData[];
};

export type {
  AuthorData,
  Feed,
  FeedPage,
  EntryData,
  MailingListType,
  SearchIndexData,
  SearchDataParams,
  HomepageData,
  HomepageEntryData,
  ConvertedXML,
};
