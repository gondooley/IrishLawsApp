
const URL_CONTEXT = "https://levelhead.ie/scope/";
const SERVLET_INVOCATION_LAWS = "laws";

/**
 * Newly introduced on the back-end for this app.
 * Titles will be returned by this.
 * @param {String} searchText 
 * @returns Search results.
 */
export async function fetchDefns(searchText) {
  //always including titles for new app
  return await fetchStuff(URL_CONTEXT + "all?searchTerm=" + searchText);
}

export async function fetchLawTitles(year) {
  return await fetchById(year);
}

export async function fetchBasicInfo(year, numberInYear) {
  return await fetchById(year + "-" + numberInYear);
}

export async function fetchParts(year, numberInYear) {
  return await fetchById(year + "-" + numberInYear + "-parts")
}

export async function fetchSectionHeadings(year, numberInYear) {
  return  await fetchById(year + "-" + numberInYear + "-sections");
}

export async function fetchSection(year, numberInYear, sectionNumber) {
  return await fetchById(year + "-" + numberInYear + "-" + sectionNumber);
}

export async function fetchSchedule(year, numberInYear, scheduleNumber) {
  return await fetchById(year + "-" + numberInYear + "-schedule" + scheduleNumber);
}

async function fetchById(id) {
  return await fetchStuff(URL_CONTEXT + SERVLET_INVOCATION_LAWS + '?id=' + id);
}

/**
 * 
 * @param {String} url 
 * @returns results of ReST call
 */
async function fetchStuff(url) {
  const response = await fetch(url,
    {
      method: 'POST'
    });
    return await response.json();
  }

/*
The following fetches were removed as they caused race conditions which could not
be resolved within the context of a SectionList. They were replaced by the single
fetch invoked by fetchDefns(String: searchText): Promise<any>

const SERVLET_INVOCATION_EXACT = "exact";
const SERVLET_INVOCATION_PARTIAL = "partial";
const SERVLET_INVOCATION_USAGE = "usage";

export async function fetchExactDefns(searchText) {
  return await fetchDefns(SERVLET_INVOCATION_EXACT, searchText);
}

export async function fetchPartialDefns(searchText) {
  return await fetchDefns(SERVLET_INVOCATION_PARTIAL, searchText);
}

export async function fetchUsages(searchText) {
  return await fetchDefns(SERVLET_INVOCATION_USAGE, searchText);
}

*/
