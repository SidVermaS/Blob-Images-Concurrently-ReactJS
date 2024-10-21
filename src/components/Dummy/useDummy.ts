import React from "react";
import { getRandomSize } from "../../utils/random.util";
import { DummyImageItemI, DummyItemI } from "../../types/dummy.type";
import { fetchDummyImages } from "../../apis/dummy.api";
const useDummy = () => {
    const [images, setImages] = React.useState<DummyImageItemI[]>([]);

    const fetchImages = React.useCallback(async () => {
        const responses = await Promise.allSettled(
            Array.from({ length: 9 }).map((_i) =>
                fetchDummyImages(getRandomSize())
            ),
        );

        const dummyItems: DummyItemI[] = responses.reduce(
            (acc, responseItem) => {
                if (responseItem.status === "fulfilled") {
                    acc.push(responseItem.value as DummyItemI);
                }
                return acc;
            },
            [] as DummyItemI[],
        );
        const imagesResponse = await Promise.all(
            dummyItems.map((dummyItem) =>
                new Promise((resolve, _reject) => {
                    const reader = new FileReader();
                    reader.onload = () =>
                        resolve(
                            {
                                size: dummyItem.size,
                                data: String(reader.result),
                            } as DummyImageItemI,
                        );
                        reader.readAsDataURL(dummyItem.blob);
                })
            ),
        );

        setImages(imagesResponse as DummyImageItemI[]);
    }, [images, setImages]);
    React.useEffect(() => {
        fetchImages();
    }, []);
    return {
        images,
    };
};
export default useDummy;
