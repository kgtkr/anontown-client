import { Checkbox, Icon, IconButton, Slider } from "@mui/material";
import * as React from "react";
import { RGBColor } from "react-color";
import { toColorString } from "../utils";
import { ColorPicker } from "./color-picker";
import {
  pipe,
  O,
  identity,
  Endomorphism,
  RNEA,
  ReadonlyNonEmptyArray,
  RA,
  HistoryStack,
  HS,
  unreachable,
} from "../prelude";

export interface Vector2d {
  x: number;
  y: number;
}

export interface Line {
  color: RGBColor;
  fill: boolean;
  width: number;
  dots: ReadonlyNonEmptyArray<Vector2d>;
}

export type Picture = {
  lines: ReadonlyArray<Line>;
};

export interface OekakiProps {
  onSubmit: (data: FormData) => void;
  size: Vector2d;
}

export function Oekaki({ onSubmit, size }: OekakiProps) {
  const [pictureStack, setPictureStack] = React.useState<HistoryStack<Picture>>(
    HS.of({
      lines: [],
    })
  );
  const [drawingLine, setDrawingLine] = React.useState<Line | null>(null);
  const [color, setColor] = React.useState<RGBColor>({ r: 0, g: 0, b: 0 });
  const [fill, setFill] = React.useState<boolean>(false);
  const [width, setWidth] = React.useState<number>(1);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const getPoint = (cx: number, cy: number): [number, number] => {
    const rect = (imgRef.current ?? unreachable()).getBoundingClientRect();
    return [cx - rect.left, cy - rect.top];
  };

  const penDown = (cx: number, cy: number) => {
    const [x, y] = getPoint(cx, cy);
    if (drawingLine === null) {
      setDrawingLine({
        color,
        fill,
        width,
        dots: RNEA.of({ x, y }),
      });
    }
  };

  const penUp = () => {
    if (drawingLine !== null) {
      const line = drawingLine;
      setPictureStack((prevStack) =>
        pipe(
          prevStack,
          HS.modifyPush((picture) => ({ lines: RA.snoc(picture.lines, line) }))
        )
      );
      setDrawingLine(null);
    }
  };

  const penMove = (cx: number, cy: number) => {
    const [x, y] = getPoint(cx, cy);
    if (drawingLine !== null) {
      setDrawingLine({
        ...drawingLine,
        dots: pipe(drawingLine.dots, (xs) => RNEA.snoc(xs, { x, y })),
      });
    }
  };

  const svg = React.useMemo(() => {
    const val = pipe(
      drawingLine,
      O.fromNullable,
      O.map((line) => (picture: Picture) => ({
        lines: RA.snoc(picture.lines, line),
      })),
      O.getOrElse<Endomorphism<Picture>>(() => identity),
      (updater) => pipe(pictureStack, HS.getCurrentValue, updater)
    );

    return `
<svg width="${size.x}px"
  height="${size.y}px"
  xmlns="http://www.w3.org/2000/svg">
  ${val.lines
    .map(
      (p) => `
      <g stroke-linecap="round"
        stroke-width="${p.width}"
        stroke="${toColorString(p.color)}"
        fill="${p.fill ? toColorString(p.color) : "none"}">
        <path d="M ${p.dots.map((l) => `L ${l.x} ${l.y}`).join(" ")}"/>
      </g>`
    )
    .join("\n")}
</svg>
    `;
  }, [drawingLine, pictureStack, size]);

  return (
    <div>
      <div>
        <div>太さ</div>
        <Slider
          value={width}
          step={1}
          min={1}
          max={10}
          onChange={(_e, v) => {
            if (typeof v === "number") {
              setWidth(v);
            }
          }}
        />
        <ColorPicker color={color} onChange={setColor} />
        塗りつぶす
        <Checkbox
          checked={fill}
          onChange={(evt) => setFill(evt.target.checked)}
        />
        <IconButton
          onClick={() =>
            setPictureStack((prevStack) => HS.uncheckedUndo(prevStack))
          }
        >
          <Icon>undo</Icon>
        </IconButton>
        <IconButton
          onClick={() =>
            setPictureStack((prevStack) => HS.uncheckedRedo(prevStack))
          }
        >
          <Icon>redo</Icon>
        </IconButton>
        <IconButton
          onClick={() => {
            // svg to formdata
            const img = imgRef.current ?? unreachable();
            const canvas = document.createElement("canvas");
            canvas.setAttribute("width", size.x.toString());
            canvas.setAttribute("height", size.y.toString());
            const ctx = canvas.getContext("2d");
            if (ctx !== null) {
              ctx.drawImage(img, 0, 0, size.x, size.y);
              canvas.toBlob((blob) => {
                if (blob !== null) {
                  const data = new FormData();
                  data.append("image", blob, "oekaki.png");
                  onSubmit(data);
                }
              });
            }
          }}
        >
          <Icon>file_upload</Icon>
        </IconButton>
      </div>
      <img
        ref={imgRef}
        style={{
          border: "solid 5px #888",
        }}
        src={"data:image/svg+xml," + encodeURIComponent(svg)}
        width={size.x}
        height={size.y}
        onMouseDown={(e) => {
          e.preventDefault();
          penDown(e.clientX, e.clientY);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          penUp();
        }}
        onMouseMove={(e) => {
          e.preventDefault();
          penMove(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          penDown(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          penUp();
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          penMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }}
      />
    </div>
  );
}
