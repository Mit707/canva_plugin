import React from "react";
import { Column, Columns, Text } from "@canva/app-ui-kit";

interface ICatalogueHeader {
  title: string;
  subTitle: string;
  open: () => void;
}

const CatalogueHeader = (props: ICatalogueHeader) => {
  const { title, subTitle, open } = props;
  return (
    <Columns spacing="0.5u">
      <Column>
        <Text
          alignment="start"
          capitalization="default"
          size="medium"
          variant="bold"
        >
          {title}
        </Text>
      </Column>
      <Column width="content">
        <div onClick={() => open()} style={{ cursor: "pointer" }}>
          <Text alignment="end" size="small" variant="bold">
            {subTitle}
          </Text>
        </div>
      </Column>
    </Columns>
  );
};

export default CatalogueHeader;
