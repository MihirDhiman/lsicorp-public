import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { publicCmsService } from "../api/services";

interface CmsEntry {
  cms_id: number;
  page_name: string;
}

interface CmsContextValue {
  cmsEntries: CmsEntry[];
  getPageData: (pageName: string) => Promise<any | null>;
  pageCache: Record<string, any>;
  loading: boolean;
}

const CmsContext = createContext<CmsContextValue>({
  cmsEntries: [],
  getPageData: async () => null,
  pageCache: {},
  loading: true,
});

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cmsEntries, setCmsEntries] = useState<CmsEntry[]>([]);
  const [pageCache, setPageCache] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicCmsService.getAll()
      .then((res: any) => {
        console.log("publicCmsService.getAll response:", res);
        console.log("Response data:", res.data);
        const data: any[] = res.data?.data ?? [];
        console.log("Extracted data array:", data);
        setCmsEntries(
          data.map((item) => ({
            cms_id: item.cms_id,
            page_name: item.page_name,
          }))
        );
        console.log("Set cmsEntries:", data.map((item) => ({
          cms_id: item.cms_id,
          page_name: item.page_name,
        })));
      })
      .catch((err: any) => {
        console.error("CMS list fetch failed:", err);
        console.error("Error details:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          message: err.message,
          data: err.response?.data
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const getPageData = useCallback(
    async (pageName: string): Promise<any | null> => {
      console.log(`getPageData called for page: "${pageName}"`);
      console.log("Available cmsEntries:", cmsEntries);
      console.log("Current pageCache:", Object.keys(pageCache));
      
      if (pageCache[pageName]) {
        console.log(`Returning cached data for "${pageName}"`);
        return pageCache[pageName];
      }

      const entry = cmsEntries.find(
        (e) => e.page_name.toLowerCase() === pageName.toLowerCase()
      );
      console.log(`Found entry for "${pageName}":`, entry);
      
      if (!entry) {
        console.log(`No entry found for "${pageName}"`);
        return null;
      }

      try {
        console.log(`Calling getById for entry.cms_id: ${entry.cms_id}`);
        const res = await publicCmsService.getById(entry.cms_id);
        const pageData = res.data?.cms_page ?? null;
        console.log(`Got page data for "${pageName}":`, pageData);
        
        if (pageData) {
          setPageCache((prev) => ({ ...prev, [pageName]: pageData }));
        }
        return pageData;
      } catch (err) {
        console.error(`CMS getById failed for "${pageName}":`, err);
        return null;
      }
    },
    [cmsEntries, pageCache]
  );

  return (
    <CmsContext.Provider value={{ cmsEntries, getPageData, pageCache, loading }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCmsPage(pageName: string) {
  console.log(`useCmsPage hook called for page: "${pageName}"`);
  const { getPageData, pageCache, loading: listLoading, cmsEntries } = useContext(CmsContext);
  const [pageData, setPageData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`useCmsPage useEffect running for page: "${pageName}"`);
    console.log("listLoading:", listLoading);
    console.log("pageCache keys:", Object.keys(pageCache));
    
    if (listLoading) {
      console.log("useCmsPage: listLoading is true, returning early");
      return;
    }

    if (cmsEntries.length === 0) {
      console.log("useCmsPage: No cmsEntries available, but will still try to fetch data");
    }
    
    if (pageCache[pageName]) {
      console.log(`useCmsPage: Found cached data for "${pageName}"`);
      setPageData(pageCache[pageName]);
      setLoading(false);
      return;
    }

    console.log(`useCmsPage: No cached data for "${pageName}", calling getPageData`);
    setLoading(true);
    getPageData(pageName)
        .then((data) => {
          console.log(`useCmsPage: Got data for "${pageName}":`, data);
          setPageData(data);
        })
        .finally(() => setLoading(false));
    }, [pageName, getPageData, pageCache, listLoading, cmsEntries]);

  return { pageData, loading };
}

export { CmsContext };