export type DummyItemI = {
    size: number;
    blob: Blob;
    }
    export type DummyImageItemI =Pick<DummyItemI, 'size'> & {
        data: string
    }