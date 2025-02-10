// Extend the Chrome webRequest type to include filterResponseData
declare namespace chrome.webRequest {
    interface StreamFilter {
        ondata: (event: { data: ArrayBuffer }) => void;
        onstop: () => void;
        write: (data: Uint8Array) => void;
        close: () => void;
    }

    export function filterResponseData(requestId: string): StreamFilter;
}