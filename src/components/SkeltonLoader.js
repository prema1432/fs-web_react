// // SkeletonLoader.jsx
//
// import React from 'react';
// import './SkeletonLoader.css';
// import {Box, LinearProgress, Skeleton} from "@mui/material"; // Import the CSS file
//
// const SkeletonLoader = () => (
//   <div>
//     {/*      <Box sx={{ width: '100%' }}>*/}
//     {/*  <LinearProgress />*/}
//     {/*</Box>*/}
//
//
//     {/*<Skeleton animation="wave" variant="rect" height={20} width="80%" style={{ marginBottom: 10 }} />*/}
//     {/*<Skeleton animation="wave" variant="rect" height={20} width="100%" style={{ marginBottom: 10 }} />*/}
//     {/*<Skeleton animation="wave" variant="rect" height={20} width="100%" style={{ marginBottom: 10 }} />*/}
//     {/*<Skeleton animation="wave" variant="rect" height={20} width="100%" style={{ marginBottom: 10 }} />*/}
//     {/*        <LinearProgress />*/}
//       <Skeleton animation="wave" />
//
//   </div>
// );
//
// export default SkeletonLoader;
// SkeletonLoader.jsx
import React from 'react';
import {Skeleton, TableCell, TableRow} from "@mui/material";

const SkeletonLoader = ({ numRows, numColumns }) => (
  <>
    {Array.from({ length: numRows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: numColumns }).map((_, colIndex) => (
          <TableCell key={colIndex}>
            <Skeleton   variant="rectangular" height={30}  />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

export default SkeletonLoader;


