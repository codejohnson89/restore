import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({metaData, onPageChange}: Props) {


    const {currentPage, totalPages, totalCount, pageSize} = metaData;

    return (
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Displaying {(currentPage-1)*pageSize+1}-
            {
                currentPage*pageSize > totalCount ? totalCount : currentPage*pageSize
            } of {totalCount} items</Typography>
          <Pagination
            size="large"
            color="primary"
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
          />
        </Box>
      </>
    );
}