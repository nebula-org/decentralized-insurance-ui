import PDFMerger from 'pdf-merger-js';

export class FileMerger {
    constructor() {
        this.merger = new PDFMerger();
    }

    /**
     * @function add
     * to add a file to form the merged files
     * file should be .pdf format
     * @param file
     * pdf file
     * @param metaData 
     * An object with producer, author, creator, title
     */
    async add(file) {
        console.log("file ", file)
        await this.merger.add(file)
    }

    async save(metaData = {}) {
        // Set metadata
        await this.merger.setMetadata({
            ...metaData
        });

        const mergedPdf = await this.merger.saveAsBlob();
        console.log("pdf ", mergedPdf)
        return mergedPdf
    }
}

