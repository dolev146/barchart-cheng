/**
 * context munu of nRMS chart component package.
 * @module views/nt/ContextMenu/ContextMenu
 */
import React, { useEffect, useState, useRef } from "react";
import "./ContextMenu.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ContextMenu = (props) => {
  const { targetRef, data, handleDeleteFn } = props;
  const [visible, setVisible] = useState(false);
  const [selectContext, setSelectContext] = useState({});
  const contextMenu = useRef();
  // contextMenu --- Start
  useEffect(() => {
    if (!targetRef) {
      console.error("need to pass targetRef");
      return;
    }
    targetRef.current &&
      targetRef.current.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
    return () => {
      // remove listener when component is unmounted
      targetRef.current &&
        targetRef.current.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [data]);
  const handleContextMenu = (event) => {
    console.log("data: ", data);
    event.preventDefault();
    const clickX = event.offsetX;
    const clickY = event.offsetY;
    // console.log("clickY: ", clickY);
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    if (!checkHasCorrespondingData(clickY)) {
      return;
    }
    setVisible(true);
    const rootW = contextMenu.current.offsetWidth;
    const rootH = contextMenu.current.offsetHeight;
    const right = screenW - clickX > rootW;
    const left = !right;
    const top = screenH - clickY > rootH;
    const bottom = !top;
    if (right) {
      contextMenu.current.style.left = `${clickX + 5}px`;
    }
    if (left) {
      contextMenu.current.style.left = `${clickX - rootW - 5}px`;
    }
    if (top) {
      contextMenu.current.style.top = `${clickY}px`;
    }
    if (bottom) {
      contextMenu.current.style.top = `${clickY - rootH}px`;
    }
  };
  const checkHasCorrespondingData = (clickY) => {
    const selectIndex = clickY;
    const selectValue =
      data[parseInt(selectIndex)] && data[parseInt(selectIndex)]["rms"];
    if (selectValue) {
      setSelectContext(data[parseInt(selectIndex)]);
    }
    return selectValue;
  };
  const handleClick = (event) => {
    if (!contextMenu.current) return;
    const wasOutside = !contextMenu.current.contains(event.target);
    if (wasOutside) {
      setVisible(false);
    }
  };
  const handleScroll = () => {
    if (visible) setVisible(false);
  };
  const handleCancel = () => {
    if (visible) setVisible(false);
  };
  const handleConfirm = async () => {
    // delete site
    handleDeleteFn(selectContext.depth, () => {
      setVisible(false);
    });
  };
  // contextMenu  --- End
  const [hoverTipVisible, setHoverTipVisible] = useState(false);
  const hoverTip = useRef();
  // hover tip --- Start
  useEffect(() => {
    if (!targetRef) {
      console.error("need to pass targetRef");
      return;
    }
    targetRef.current &&
      targetRef.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      // remove listener when component is unmounted
      targetRef.current &&
        targetRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const handleMouseMove = (event) => {
    event.preventDefault();
    const clickX = event.offsetX;
    const clickY = event.offsetY;
    // console.log("clickY: ", clickY);
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    if (!checkHasCorrespondingData(clickY)) {
      setHoverTipVisible(false);
      return;
    }
    setHoverTipVisible(true);
    const rootW = hoverTip.current.offsetWidth;
    const rootH = hoverTip.current.offsetHeight;
    const right = screenW - clickX > rootW;
    const left = !right;
    const top = screenH - clickY > rootH;
    const bottom = !top;
    if (right) {
      hoverTip.current.style.left = `${clickX}px`;
    }
    if (left) {
      hoverTip.current.style.left = `${clickX - rootW - 5}px`;
    }
    if (top) {
      hoverTip.current.style.top = `${clickY - 70}px`;
    }
    if (bottom) {
      hoverTip.current.style.top = `${clickY - rootH}px`;
    }
  };
  // hover tip --- End
  return (
    <>
      {visible ? (
        <Card ref={contextMenu} className="contextMenu flex flex-column">
          <div className={"mb20"}>delete depth: {selectContext.depth} ?</div>
          <div>
            <Button size="small" onClick={handleCancel}>
              {t("Cancel")}
            </Button>
            &nbsp;&nbsp;
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleConfirm}
            >
              {t("Confirm")}
            </Button>
          </div>
        </Card>
      ) : null}
      {hoverTipVisible ? (
        <Card ref={hoverTip} className="contextMenu flex flex-column">
          depth: {selectContext.depth}, &nbsp;&nbsp; nrms: {selectContext.rms}
        </Card>
      ) : null}
    </>
  );
};

export default ContextMenu;
