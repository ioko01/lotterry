import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import {
    Slider,
    Grid,
    CardMedia,
    Card,
    Box,
    Typography,
    Button,
    Grow,
} from "@material-ui/core";

import CameraAltIcon from "@material-ui/icons/CameraAlt";
import LockIcon from "@material-ui/icons/Lock";
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/browser";
import { useStyled } from "./styled";
import { useRef } from "react";
import { useEffect } from "react";
import { DecodeHintType } from "@zxing/library";
import { useMutation } from "@apollo/client";
import { SCANNER } from "../../../lib/mutations";
import { Scanner } from "../../../models/Scanner";

type QrCodeStatusType = "SUCCESS" | "FAIL";
type CanvasLockedTypes = "LOCKED" | "UNLOCKED";
type ScanStatusTypes =
    | "FIRST_SCAN"
    | "SCAN_ALL"
    | "STOP"
    | "WAITING"
    | "COMPLETE"
    | "FAIL";

let lockedCanvasPosition: CanvasLockedTypes = "UNLOCKED";

const scanQrCodeWithCanvas = (canvas: HTMLCanvasElement) => {
    try {
        const hints = new Map();
        const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX];
        hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
        const reader = new BrowserMultiFormatReader();
        reader.setHints(hints);
        const qrCodeResult = reader.decodeFromCanvas(canvas);

        if (qrCodeResult.getBarcodeFormat() === BarcodeFormat.DATA_MATRIX) {
            lockedCanvasPosition = "LOCKED";
            return qrCodeResult.getText();
        }
        return false;
    } catch (error) {
        return;
    }
};

const CropperLotterry = () => {
    try {
        const classes = useStyled();
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const [selectFiles, setSelectFiles] = useState<string[]>();
        const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
        const [zoom, setZoom] = useState(1);
        const [QRCode, setQRCode] = useState<string[] | null>(null);
        const [QRCodeStatus, setQRCodeStatus] =
            useState<QrCodeStatusType>("FAIL");
        const [pointer, setPointer] = useState<Area>();
        const [scan, setScan] = useState<ScanStatusTypes>("STOP");

        let ArrQRCode: string[] = new Array();

        const scanStatusFinder = (status: ScanStatusTypes[]) =>
            status.find((stat) => stat === scan);

        const fileselectedHandler = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            try {
                const files: FileList | null = e.currentTarget.files;
                if (files) {
                    let ArrFiles: string[] = new Array();
                    lockedCanvasPosition = "UNLOCKED";
                    ArrQRCode = [];
                    Array.from(files).forEach((file) => {
                        ArrFiles.push(URL.createObjectURL(file));
                        setSelectFiles(ArrFiles);
                        setScan("FIRST_SCAN");
                    });
                }
            } catch (error) {
                console.warn(error);
            }
        };

        const renderCanvas = (pointer: Area) => {
            if (selectFiles && scanStatusFinder(["FIRST_SCAN"])) {
                ArrQRCode = [];
                const image = new Image();
                image.src = selectFiles[0];
                const renderCtx = canvasRef.current.getContext("2d");

                renderCtx.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
                renderCtx.drawImage(
                    image,
                    pointer.x,
                    pointer.y,
                    pointer.width,
                    pointer.height,
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );

                const isScanSuccessfully = scanQrCodeWithCanvas(
                    canvasRef.current
                );

                if (isScanSuccessfully) {
                    setScan("STOP");
                    setPointer(pointer);
                }

                if (isScanSuccessfully && !QRCode) {
                    setQRCodeStatus("SUCCESS");
                }
            }
        };

        const onCropAreaChange = useCallback(
            (_, croppedAreaPixels: Area) => {
                try {
                    renderCanvas(croppedAreaPixels);
                } catch (error) {
                    console.warn(error);
                }
            },
            [selectFiles]
        );

        const scanAll = () => {
            if (selectFiles && scanStatusFinder(["SCAN_ALL"])) {
                ArrQRCode = [];
                selectFiles.map((file) => {
                    const image = new Image();
                    image.src = file;
                    const renderCtx = canvasRef.current.getContext("2d");
                    image.onload = () => {
                        if (image.complete) {
                            renderCtx.clearRect(
                                0,
                                0,
                                canvasRef.current.width,
                                canvasRef.current.height
                            );
                            renderCtx.drawImage(
                                image,
                                pointer.x,
                                pointer.y,
                                pointer.width,
                                pointer.height,
                                0,
                                0,
                                canvasRef.current.width,
                                canvasRef.current.height
                            );

                            const result = scanQrCodeWithCanvas(
                                canvasRef.current
                            );

                            if (result) {
                                ArrQRCode.push(result.toString());
                            } else {
                                ArrQRCode.push(undefined);
                            }

                            setQRCode(ArrQRCode);
                            setQRCodeStatus("SUCCESS");
                            // console.log(ArrQRCode);
                            setScan("COMPLETE");
                        }
                    };
                });
            }
        };

        const [scanner, { loading }] = useMutation<{ scanner: Scanner }>(
            SCANNER,
            {
                onCompleted: (data) => {
                    console.log(data);
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );

        const scannerAPI = async (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
            await scanner({
                variables: {
                    data: e.target,
                },
            });
        };

        useEffect(() => {}, [scan, ArrQRCode, pointer, QRCode]);

        return (
            <>
                <Grid container className={classes.gridUploadimage}>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="button-file"
                            type="file"
                            multiple
                            onChange={fileselectedHandler}
                        />

                        <label htmlFor="button-file">
                            <Button
                                className={classes.btnUploadimage}
                                color="primary"
                                aria-label="upload picture"
                                variant="text"
                                component="h1"
                                fullWidth
                            >
                                <CameraAltIcon
                                    className={classes.iconUploadimage}
                                />
                                &nbsp;IMAGES UPLOAD
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container className={classes.gridContainer}>
                            <Grid
                                item
                                xs={12}
                                sm={8}
                                md={5}
                                className={classes.cropGridItem}
                            >
                                <div className={classes.app}>
                                    <Grow
                                        in={lockedCanvasPosition === "LOCKED"}
                                    >
                                        <Box className={classes.locked}>
                                            <LockIcon
                                                className={
                                                    classes.iconLockedimage
                                                }
                                            />
                                            &nbsp;LOCKED
                                        </Box>
                                    </Grow>

                                    <div className={classes.cropContainer}>
                                        <Cropper
                                            mediaProps={{
                                                id: "cropperImage",
                                            }}
                                            image={
                                                selectFiles
                                                    ? selectFiles[0]
                                                    : null
                                            }
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={20 / 20}
                                            onCropChange={(location) => {
                                                if (
                                                    lockedCanvasPosition ===
                                                    "UNLOCKED"
                                                ) {
                                                    setCrop(location);
                                                }
                                            }}
                                            onCropAreaChange={onCropAreaChange}
                                            onZoomChange={(zoom) => {
                                                if (
                                                    lockedCanvasPosition ===
                                                    "UNLOCKED"
                                                ) {
                                                    setZoom(zoom);
                                                }
                                            }}
                                            maxZoom={20}
                                        />
                                    </div>
                                    <canvas
                                        ref={canvasRef}
                                        width="100%"
                                        height="100%"
                                        className={classes.canvas}
                                    />
                                    <div className={classes.controls}>
                                        <Slider
                                            value={zoom}
                                            min={1}
                                            max={20}
                                            step={0.1}
                                            aria-labelledby="Zoom"
                                            onChange={(e, zoom) => {
                                                if (
                                                    lockedCanvasPosition ===
                                                    "UNLOCKED"
                                                ) {
                                                    setZoom(Number(zoom));
                                                }
                                            }}
                                            className={classes.slider}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        {selectFiles ? (
                            <Grid
                                item
                                sm={12}
                                md={5}
                                className={classes.cropGridItem}
                            >
                                <Card className={classes.card} elevation={0}>
                                    <CardMedia
                                        component="img"
                                        image={selectFiles[0]}
                                        title="Paella dish"
                                    />
                                    <Box display="flex" flexDirection="column">
                                        <Box className={classes.detail}>
                                            <Typography>
                                                STATUS: {QRCodeStatus}
                                            </Typography>
                                        </Box>
                                        <Box className={classes.detail}>
                                            <Typography>
                                                NUMBER: {QRCode}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ) : null}

                        <Button onClick={scannerAPI}>SCAN ALL</Button>
                    </Grid>
                </Grid>
            </>
        );
    } catch (error) {
        console.warn(error);
    }
};

export default CropperLotterry;
