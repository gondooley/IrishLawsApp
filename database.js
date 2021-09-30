
const URL_CONTEXT = "https://levelhead.ie/scope/";
const SERVLET_INVOCATION_LAWS = "laws";
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

async function fetchDefns(servletInvocation, searchText) {
  return await fetchStuff(URL_CONTEXT + servletInvocation + '?searchTerm=' + searchText);
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

async function fetchStuff(url) {
  const response = await fetch(url,
    {
      method: 'POST'
    });
    return await response.json();
  }
