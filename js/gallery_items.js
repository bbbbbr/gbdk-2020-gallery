
// Convert gallery items to DOM elements
function createGalleryItems(galleryItems) {
    const container = document.getElementById('gallery_grid');
    galleryItems.forEach(item => {

        // Create main div for each item
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery_grid_item';

        // Create inner div for item details
        const itemContainer = document.createElement('div');
        itemContainer.className = 'itemContainer';

        // Image
        // Add a link (type=primary) if possible for the anchor holding the image
        const imgLink = document.createElement('a');
        item.linksArray.some(function(link) {
            if (link.type === "primary") {
                imgLink.href = link.url;
                return true
            } else
                return false;
        });
        const img = document.createElement('img');
        img.src = item.imagePreviewURL;
        img.alt = "game image preview";
        img.loading = "lazy";
        imgLink.appendChild(img);
        itemContainer.appendChild(imgLink);

        // Item Title
        const titleDiv = document.createElement('div');
        titleDiv.className = 'itemTitle';
        titleDiv.textContent = item.itemTitle;
        itemContainer.appendChild(titleDiv);

        // Short Description
        const shortDescDiv = document.createElement('div');
        shortDescDiv.className = 'shortDescription';
        shortDescDiv.textContent = item.shortDescription;
        itemContainer.appendChild(shortDescDiv);

        // Author Name
        const authorDiv = document.createElement('div');
        authorDiv.className = 'authorName';
        authorDiv.textContent = item.authorName;
        itemContainer.appendChild(authorDiv);

        // Links
        const linksDiv = document.createElement('div');
        linksDiv.className = 'itemLinks';
        item.linksArray.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.displayText;
            linksDiv.appendChild(linkElement);
        });
        itemContainer.appendChild(linksDiv);

        // Add Meta info footer with text cards
        const metaDiv = document.createElement('div');
        metaDiv.className = 'itemMeta';
        // Attach the cards
        item.platformTags.split(', ').forEach(tag => { appendSpan(tag,  "itemMetaPlatforms",    metaDiv); });
        if (item.isOpenSource === true)       appendSpan("Open Source", "itemMetaOpenSource",   metaDiv);
        if (item.supportsLinkPlay === true)   appendSpan("Link Play",   "itemMetaSupportsLink", metaDiv);
        if (item.hasPhysicalRelease === true) appendSpan("Cart Release","itemMetaCartRelease",  metaDiv);
        itemContainer.appendChild(metaDiv);

        // Create matching dataset values for tags
        const tags = ['categoryTags', 'gameTypeTags', 'platformTags'];
        tags.forEach(tag => {
            const tagValue = item[tag];
            if (tagValue) {
                itemDiv.dataset[tag] = tagValue;
            }
        });
        if (item.isOpenSource === true)       itemDiv.dataset["isOpenSource"] = "";
        if (item.supportsLinkPlay === true)   itemDiv.dataset["supportsLinkPlay"] = "";
        if (item.hasPhysicalRelease === true) itemDiv.dataset["hasPhysicalRelease"] = "";

        // Append everything inside the main div
        itemDiv.appendChild(itemContainer);
        container.appendChild(itemDiv);
    });
}
