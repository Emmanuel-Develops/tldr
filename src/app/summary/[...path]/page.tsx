import { convertXmlToText } from "@/helpers/convert-from-xml";
import { AuthorData } from "@/helpers/types";
import * as fs from "fs";
import Image from "next/image";
import DiscussionHistory from "./components/historythread";

export type sortedAuthorData = AuthorData & {initialIndex: number, dateInMS: number}

const getSummaryData = async (path: string[]) => {
  const pathString = path.join("/")
  try {
    const fileContent = fs.readFileSync(
      `${process.cwd()}/public/static/static/${pathString}.xml`,
      "utf-8"
    );
    const data = await convertXmlToText(fileContent, pathString);
    const linksCopy = data.data?.historyLinks
    console.log("fetch", data.data.historyLinks)

    const authorsFormatted: sortedAuthorData[] = data.data.authors.map((author, index) => ({...author, initialIndex: index, dateInMS: Date.parse(author.date + "T" + author.time)}))
    const chronologicalAuthors = authorsFormatted.sort((a, b) => {
      if (a.dateInMS < b.dateInMS) {
        return -1
      }
      if (a.dateInMS > b.dateInMS) {
        return 1
      }
      else {
        return 0
      }
    })
    const chronologicalLinksBasedOffAuthors = linksCopy?.length ? chronologicalAuthors.map((author) => linksCopy[author.initialIndex]) : []
    
    return {
      ...data,
      "data": {
        ...data.data,
        authors: chronologicalAuthors,
        historyLinks: chronologicalLinksBasedOffAuthors
      }
    };
  } catch (err) {
    return null
  }
};

export default async function Page({ params }: { params: { path: string[] } }) {
  const summaryData = await getSummaryData(params.path);
  if (!summaryData) return <h1>No data found</h1>;
  const type = params.path[0];
  const splitSentences = summaryData.data.entry.summary.split(/(?<=[.!?])\s+/);
  const firstSentence = splitSentences[0];
  const newSummary = summaryData.data.entry.summary.replace(firstSentence, "");
  const { authors, historyLinks } = summaryData.data;

  return (
    <main>
      <div className="flex flex-col gap-4 my-10 ">
        <div className="flex items-center gap-3">
          <Image
            src={`/icons/${type}_icon.svg`}
            width={18}
            height={18}
            alt=""
          />
          <p className="font-semibold font-inter text-[12px]">{type}</p>
        </div>
        <h2 className="font-inika text-4xl">{summaryData.data.title}</h2>
      </div>
      <section className="my-10">
        <p className="text-2xl font-inika my-2">{firstSentence}</p>
        <p>{newSummary}</p>
      </section>
      {historyLinks && historyLinks?.length > 0 ? (
        <DiscussionHistory historyLinks={historyLinks} authors={authors} />
      ) : null}
    </main>
  );
}
