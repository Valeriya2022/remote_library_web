import React, { useRef, useState, useEffect } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import {useLocation} from 'react-router-dom';

const ownStyles = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "black"
  },
  paragraph: {
      fontSize: "30px"
  }
};

//const loc = "epubcfi(/6/4[chapter1]!/4/2[chapter1]/8[s3]/6/1:490)";
const loc = null;

export default function ReactReaderEpub() {
    const loc = useLocation()
    const path = loc.state.path
    console.log("path:", path)
  const [selections, setSelections] = useState([]);
  const renditionRef = useRef(null);

  const [location, setLocation] = useState(loc);
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
    console.log(location);
    localStorage.setItem("bookepub+"+path, epubcifi)
  };

  // setSelections([
  //   {
  //     text:
  //       "In previous generations, people often believed that business transactions were immo",
  //     cfiRange: "epubcfi(/6/4[chapter1]!/4/2[chapter1]/4[s1]/6,/1:0,/1:83)"
  //   }
  // ]);

  useEffect(() => {
    if (renditionRef.current){
      let lock = localStorage.getItem("bookepub+"+path)
      setLocation(lock)
    }
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(cfiRange).toString(),
            cfiRange
          })
        );
        renditionRef.current.annotations.add(
          "highlight",
          cfiRange,
          {},
          null,
          "hl",
          {
            fill: "white",
            "fill-opacity": "0.5"
          }
        );
        contents.window.getSelection().removeAllRanges();
      }
      renditionRef.current.on("selected", setRenderSelection);
      return () => {
        renditionRef.current.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, selections]);
  return (
    <>
      <div className="App" style={{ position: "relative", height: "80vh"}}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={path}
          styles={ownStyles}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.default({
              "::selection": {
                background: "blue",
                fontSize: "30px",
              }
            });
            setSelections([]);
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1,
          backgroundColor: "white"
        }}
      >
        <ul>
          {selections.map(({ text, cfiRange }, i) => (
            <li key={i}>
              {text}{" "}
              <button
                onClick={() => {
                  renditionRef.current.annotations.add(
                    "highlight",
                    "epubcfi(/6/8[chapter_001]!/4/2/12,/1:0,/1:44)",
                    {},
                    null,
                    "hl",
                    {
                      fill: "blue",
                      "fill-opacity": "0.5"
                    }
                  );
                  console.log(cfiRange);
                  renditionRef.current.display(cfiRange);
                  
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  renditionRef.current.annotations.remove(
                    cfiRange,
                    "highlight"
                  );
                  setSelections(selections.filter((item, j) => j !== i));
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
