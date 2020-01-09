<template>
  <div id="studio">
    <div class="studio-text-box">
      <span class="studio-text">studio</span>
    </div>
    <div class="tag-studio">
      <div class="search">search</div>
      <div class="tag-box">
        <div class="tag-list-box">
          <span class="tag-list">UI</span>
          <div class="nested">
            <div class="tag-list-box">
              <span class="tag-list ui">Articles</span>
              <div class="nested">
                <div class="template">Article Clean</div>
                <div>Article Dual Column</div>
                <div>Article List</div>
              </div>
            </div>
            <div class="tag-list-box">
              <span class="tag-list ui">Features</span>
              <div class="nested">
                <div>Features Blue</div>
                <div>Features Boxed</div>
                <div>Features Clean</div>
              </div>
            </div>
            <div class="tag-list-box">
              <span class="tag-list ui">Footers</span>
              <div class="nested">
                <div>Footer Basic</div>
                <div>Footer Clean</div>
                <div>Footer Dark</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Text</span>
          <div class="nested">
            <div>Heading</div>
            <div>Paragraph</div>
            <div>Alert</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Image</span>
          <div class="nested">
            <div>Image</div>
            <div>Icon</div>
            <div>Carousel</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Controls</span>
          <div class="nested">
            <div>Button</div>
            <div>Split Button</div>
            <div>Button Group</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Grid</span>
          <div class="nested">
            <div>Row</div>
            <div>Column</div>
            <div>Column Helper</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Containers</span>
          <div class="nested">
            <div>Container</div>
            <div>Tabs</div>
            <div>Accordion</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Cards</span>
          <div class="nested">
            <div>Card</div>
            <div>Panel</div>
            <div>Thumbnail</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Pages</span>
          <div class="nested">
            <div>Navbar</div>
            <div>Nav</div>
            <div>Header</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Pagination</span>
          <div class="nested">
            <div>Pagination</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Table</span>
          <div class="nested">
            <div>Table</div>
            <div>Table Row</div>
            <div>Table Cell</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Form</span>
          <div class="nested">
            <div>Form</div>
            <div>Form Group</div>
            <div>Field Label</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Social</span>
          <div class="nested">
            <div>Facebook Like Button</div>
            <div>Facebook Post Embed</div>
            <div>Twitter Follow Button</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Misc</span>
          <div class="nested">
            <div>Chart</div>
            <div>Map</div>
            <div>Video</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#studio {
  .studio-text-box {
    height: 5%;
    justify-content: left;
    justify-items: left;
    .studio-text {
      background-color: #41474c;
      padding: 0.2rem;
    color: #fff;
}
  }
  .tag-studio {
    border: 3px solid #49b6a7;
    height: 95%;
    // display: flex;
    // flex-direction: column;
    overflow: auto;
    .tag-studio::-webkit-scrollbar{
        width: 5px;
    }
    .search {
      background-color: #41474c;
      color: #fff;
    }
    .tag-box {
      // overflow:scroll;
      align-items: left;
      justify-content: left;
      .tag-list-box {
        // float: left;
        text-align: left;
        margin: 0.1rem;
        .tag-list {
          margin-left: 0.4rem;
          color: #e7e4e4;
          cursor: pointer;
          user-select: none; /* Prevent text selection */
          //   float: left;
        }

        /* Create the tag-list/arrow with a unicode, and style it */
        .tag-list::before {
          content: "\25B6";
          color: #e7e4e4;
          display: inline-block;
          margin-right: 6px;
        }

        /* Rotate the tag-list/arrow icon when clicked on (using JavaScript) */
        .tag-list-down::before {
          transform: rotate(90deg);
        }
        .nested {
          display: none;
        }

        /* Show the nested list when the user clicks on the tag-list/arrow (with JavaScript) */
        .active {
          display: block;
        }
        .template {
          margin-left: 2rem;
          color: #e7e4e4;
        }
        .template::before {
          content: "\2B1A";
          margin-right: 0.2rem;
        }
        .ui {
          margin-left: 1.2rem;
        }
      }
    }
  }
}
</style>
