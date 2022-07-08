import React from "react";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {Checkbox} from "@mui/material";

const FavoriteButton = (props) => {
    // console.log(props)
    return (
        <Checkbox color="primary"
            {...props}
            icon={<FavoriteBorder/>}
            checkedIcon={<Favorite/>}
            size='large'
            sx={{
                color: 'red',
                '&.Mui-checked': {
                    color: 'red',
                },
                '&.Mui-disabled': {
                    color: 'secondary',
                }
            }}
        />
    );
};
export default FavoriteButton;
