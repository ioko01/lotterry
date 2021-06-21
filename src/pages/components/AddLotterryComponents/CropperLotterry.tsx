import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import {
    createStyles,
    makeStyles,
    Theme,
    Slider,
    Grid,
    CardMedia,
    Card,
    Box,
    Typography,
    Button,
    IconButton,
} from "@material-ui/core";

import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { BrowserMultiFormatReader } from "@zxing/browser";

const useStyled = makeStyles((theme: Theme) =>
    createStyles({
        app: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        cropContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "80px",
        },
        controls: {
            position: "absolute",
            bottom: 0,
            left: "50%",
            width: "50%",
            transform: "translateX(-50%)",
            height: "80px",
            display: "flex",
            alignItems: "center",
        },
        slider: {
            padding: "22px 0px",
        },
        cropGridItem: {
            width: "auto",
            minHeight: "250px",
            height: "auto",
            position: "relative",
        },
        card: {
            display: "flex",
            flexDirection: "column",
        },
        detail: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            minWidth: "100%",
        },
        input: {
            display: "none",
        },
        fileMobile: {
            display: "static",
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        fileDesktop: {
            display: "static",
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
        },
        canvas: {
            position: "absolute",
            top: 2,
            right: 2,
            filter: "saturate(300%)",
            msFilter: "saturate(300%)",
            WebkitFilter: "saturate(300%)",
        },
        gridContainer: {
            padding: theme.spacing(2),
            justifyContent: "space-evenly",
        },
    })
);

const imageUrl = "/Scan.jpg";

const CropperLotterry = () => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [QRCode, setQRCode] = useState<string | null>(null);
    const [QRCodeStatus, setQRCodeStatus] = useState<string | null>(null);
    const classes = useStyled();

    const onCropComplete = useCallback((_, croppedAreaPixels: Area) => {
        getImage(croppedAreaPixels);
    }, []);

    const scanner = () => {
        const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
        const codeReader = new BrowserMultiFormatReader();
        const source = canvas;
        setQRCode(codeReader.decodeFromCanvas(source).getText());
    };

    const getImage = (area: Area) => {
        try {
            const canvas = document.getElementById(
                "canvas1"
            ) as HTMLCanvasElement;
            const ctx: CanvasRenderingContext2D | null =
                canvas.getContext("2d");
            const image = document.getElementById("img1") as HTMLImageElement;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.drawImage(
                image,
                area.x,
                area.y,
                area.width,
                area.height,
                0,
                0,
                canvas.width,
                canvas.height
            );

            scanner();
            setQRCodeStatus("SUCCESS");
        } catch (error) {
            if (QRCode) {
                setQRCode(null);
                setQRCodeStatus("FAIL");
            }
        }
    };

    useEffect(() => {
        try {
            scanner();
            setQRCodeStatus("SUCCESS");
        } catch (error) {
            if (QRCode) {
                setQRCode(null);
                setQRCodeStatus("FAIL");
            }
        }
    }, [QRCode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const img = document.getElementById("img1") as HTMLImageElement;
        const img2 = document.getElementById("img2") as HTMLImageElement;
        const file: FileList | null = e.currentTarget.files;
        if (file) {
            img.src = URL.createObjectURL(file[0]);
            img2.src = URL.createObjectURL(file[0]);
        }
    };

    return (
        <>
            <input
                accept="image/*"
                className={classes.input}
                id="button-file"
                type="file"
                multiple
                onChange={handleChange}
            />
            <label htmlFor="button-file" className={classes.fileMobile}>
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <CameraAltIcon />
                </IconButton>
            </label>

            <label htmlFor="button-file" className={classes.fileDesktop}>
                <Button
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    variant="contained"
                >
                    <CameraAltIcon />
                    &nbsp;IMAGE UPLOADS
                </Button>
            </label>

            <Grid container className={classes.gridContainer}>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    className={classes.cropGridItem}
                >
                    <div className={classes.app}>
                        <div className={classes.cropContainer}>
                            <Cropper
                                mediaProps={{
                                    id: "img1",
                                }}
                                image={imageUrl}
                                crop={crop}
                                zoom={zoom}
                                aspect={20 / 20}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onCropAreaChange={onCropComplete}
                                onZoomChange={setZoom}
                                maxZoom={20}
                            />
                        </div>
                        <canvas
                            width="100%"
                            height="100%"
                            id="canvas1"
                            className={classes.canvas}
                        />
                        <div className={classes.controls}>
                            <Slider
                                value={zoom}
                                min={1}
                                max={20}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => setZoom(Number(zoom))}
                                className={classes.slider}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item sm={12} md={5} className={classes.cropGridItem}>
                    <Card className={classes.card} elevation={0}>
                        <CardMedia
                            id="img2"
                            component="img"
                            image={imageUrl}
                            title="Paella dish"
                        />
                        <Box display="flex" flexDirection="column">
                            <Box className={classes.detail}>
                                <Typography>STATUS: {QRCodeStatus}</Typography>
                            </Box>
                            <Box className={classes.detail}>
                                <Typography>NUMBER: {QRCode}</Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default CropperLotterry;
