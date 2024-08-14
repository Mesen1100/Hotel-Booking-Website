import { ImageList, ImageListItem } from "@mui/material";
import Image, { StaticImageData } from "next/image";

interface Props {
    hotelRoomPhotos: string[];
}

const HotelImages: React.FC<Props> = ({ hotelRoomPhotos }) => {
    
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop:"70px"}}>
            <ImageList sx={{ width: "90%", height: 350 }} cols={4} rowHeight={200} variant="quilted">
                {hotelRoomPhotos.map((item, index) => (
                    <ImageListItem key={index}>
                        <Image src={item} alt={`Hotel Room ${index + 1}`} width={300} height={200}/>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}
export default HotelImages;