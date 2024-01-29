import React from "react";
import styles from "styles/video.css";
import { Box, Button } from "@canva/app-ui-kit";
import { ICurrentCatalogue } from "src/features/video/interface/Video.Interface";

interface IFooterProps {
  currentValue: ICurrentCatalogue;
  useCatalogue: () => void;
  type: string;
  changeView: (key: string, flag: boolean) => void;
}

const CatalogueFooter = (props: IFooterProps) => {
  const { currentValue, useCatalogue, type, changeView } = props;
  return (
    <div className={styles.stickyButtonContainer}>
      <Box paddingBottom="1.5u">
        <Button
          stretch
          variant="primary"
          disabled={
            type !== "media"
              ? !currentValue[type].id
              : currentValue.media.length === 0
          }
          onClick={useCatalogue}
        >
          Use
        </Button>
      </Box>
      <Box paddingBottom="1.5u">
        <Button
          stretch
          variant="secondary"
          onClick={() => changeView("", false)}
        >
          Cancel
        </Button>
      </Box>
    </div>
  );
};

export default CatalogueFooter;
