import { Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  books: any;
}

const ShowLibrary: React.FC<IProps> = ({ books }) => {
  return (
    <Grid mt="1rem" templateColumns="repeat(4, 1fr)" gap={4}>
      {books.map((book, key) => (
        <GridItem as="a" href={"/book/" + book.id} key={key}>
          <Image
            src={
              book.volumeInfo?.imageLinks?.smallThumbnail
                ? book.volumeInfo?.imageLinks?.smallThumbnail
                : "/static/DefaultBook.svg"
            }
            h="120px"
            w="100px"
          />
          <Text>{book.volumeInfo?.title}</Text>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ShowLibrary;
