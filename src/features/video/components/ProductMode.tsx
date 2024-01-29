import React, { useEffect, useState } from "react";
import { API_CONFIG } from "src/shared/constants/api";
import { useApi } from "src/shared/context/ApiContext";
import HttpService from "src/shared/services/Http.service";
import Catalogue from "src/shared/components/catalogue/Catalogue";
import Accordion from "src/shared/components/accordion/Accordion";
import SeeAllView from "src/shared/components/catalogue/components/SeeAllView";
import { toast } from "react-toastify";
import styles from "styles/components.css";
import {
  Box,
  Button,
  CharacterCountDecorator,
  Column,
  Columns,
  FormField,
  Grid,
  MultilineInput,
  NumberInput,
  PlusIcon,
  Rows,
  Text,
  TextInput,
  TrashIcon,
} from "@canva/app-ui-kit";
import {
  CatalogueItems,
  CatalogueValue,
  IActor,
  IMedia,
  IMusic,
  ISeeAllDetails,
  ITemplate,
  IVoice,
} from "src/shared/components/catalogue/interface/Catalogue.interface";
import {
  ICurrentCatalogue,
  IProductData,
  IProductModeProps,
} from "../interface/Video.Interface";
import { PLUGIN_ID } from "src/shared/constants";
import { checkAuthentication } from "src/shared/utility/Utility";

const ProductMode = (props: IProductModeProps) => {
  const { manageView } = props;
  const {
    allTemplates,
    allActors,
    allMusics,
    allVoices,
    allMedias,
    setMedia,
    changeAuthToken,
  } = useApi();

  const [loader, setLoader] = useState(false);
  const [reviews, setReviews] = useState<string[]>([""]);
  const [actorList, setActorList] = useState<IActor[]>(allActors);
  const [voiceList, setVoiceList] = useState<IVoice[]>(allVoices);
  const [musicList, setMusicList] = useState<IMusic[]>(allMusics);
  const [mediaList, setMediaList] = useState<IMedia[]>(allMedias);
  const [templateList, setTemplateList] = useState<ITemplate[]>(allTemplates);
  const [showSeeAll, setShowSeeAll] = useState<ISeeAllDetails>({
    show: false,
    catalogueType: "",
  });
  const [productData, setProductData] = useState<IProductData[]>([
    { key: "", value: "" },
  ]);
  const [formDetails, setFormDetails] = useState({
    title: "",
    short_description: "",
    long_description: "",
    price: 1,
    recommended_retail_price: 1,
    product_category: "",
    shop_url: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    short_description: "",
    long_description: "",
  });
  const [selectedCatalogue, setSelectedCatalogue] = useState<ICurrentCatalogue>(
    {
      voice: {} as IVoice,
      music: {} as IMusic,
      actor: {} as IActor,
      template: {} as ITemplate,
      media: [],
    }
  );

  const handleChangeCatalogue = (key: string, value: CatalogueItems) => {
    setSelectedCatalogue((prev) => ({ ...prev, [key]: value }));
  };

  const getAllMedia = (id?: string) => {
    HttpService.get(`${API_CONFIG.asset}`).then((res) => {
      if (!res.is_error) {
        setMedia(res.data.results);
        if (id) {
          const data = res.data.results.find((x: IMedia) => x.id === id);
          if (data)
            handleChangeCatalogue("media", [...selectedCatalogue.media, data]);
        }
        // else {
        //   //handleChangeCatalogue("media", [res.data.results[0]]);
        // }
      }
    });
  };
  useEffect(() => {
    if (allMedias?.length > 0) {
      setSelectedCatalogue((prev) => ({ ...prev, media: [allMedias[0]] }));
      setMediaList(allMedias);
    } else {
      getAllMedia();
    }
  }, [allMedias]);

  useEffect(() => {
    if (allTemplates?.length > 0)
      setSelectedCatalogue((prev) => ({ ...prev, template: allTemplates[0] }));
    setTemplateList(allTemplates);
  }, [allTemplates]);
  useEffect(() => {
    setActorList(allActors);
  }, [allActors]);
  useEffect(() => {
    setVoiceList(allVoices);
  }, [allVoices]);
  useEffect(() => {
    setMusicList(allMusics);
  }, [allMusics]);

  const handleView = (type: string, flag: boolean) => {
    setShowSeeAll({ show: flag, catalogueType: type });
  };

  const handleFormValidation = () => {
    const isFormValid =
      formDetails.title?.trim() &&
      formDetails.short_description.trim() &&
      formDetails.long_description.trim();

    if (isFormValid) {
      setErrorMessage({
        title: "",
        short_description: "",
        long_description: "",
      });
      return true;
    } else {
      setErrorMessage({
        title: formDetails.title.trim() ? "" : "Title is required.",
        short_description: formDetails.short_description.trim()
          ? ""
          : "Description is required.",
        long_description: formDetails.short_description.trim()
          ? ""
          : "Long description is required.",
      });
      return false;
    }
  };

  const createVideo = () => {
    setLoader(true);
    if (handleFormValidation()) {
      HttpService.post(`${API_CONFIG.video}/product`, {
        plugin: PLUGIN_ID,
        template_id: selectedCatalogue.template.id ?? "",
        voice_id: selectedCatalogue.template.id ?? "",
        actor_id: selectedCatalogue.actor.id ?? "",
        music_id: selectedCatalogue.music.id ?? "",
        media: selectedCatalogue?.media?.map((item: IMedia) => item.id) ?? [""],
        title: formDetails.title,
        short_description: formDetails.short_description,
        long_description: formDetails.long_description,
        price: formDetails.price,
        recommended_retail_price: formDetails.recommended_retail_price,
        product_category: formDetails.product_category,
        shop_url: formDetails.shop_url,
        reviews: reviews,
        data: { ...productData[0] },
        metadata: {},
      })
        .then((res) => {
          if (!res.is_error) {
            manageView("waiting-view", res.data.identifier);
          } else toast.error(res.message);
          setLoader(false);
        })
        .catch((error) => {
          if (checkAuthentication(error)) changeAuthToken("");
          toast.error(error.response.data.message || error.message);
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };
  const changeFormDetails = (key: string, value: string | number) => {
    // clearTimeout(time);
    // const timeoutId = setTimeout(() => {
    setFormDetails({ ...formDetails, [key]: value });
    setErrorMessage({
      ...errorMessage,
      [key]: value ? "" : `${key.charAt(0).toUpperCase()} is required.`,
    });
    // }, 500) as any;
    // setTime(timeoutId as number);
  };
  const manageReview = (index: number | undefined) => {
    const tempReviews = [...reviews];
    index || index === 0 ? tempReviews.splice(index, 1) : tempReviews.push("");
    setReviews([...tempReviews]);
  };
  const changeReview = (review: string, index: number) => {
    // clearTimeout(time);
    // const timeoutId = setTimeout(() => {
    const tempReviews = [...reviews];
    tempReviews[index] = review;
    setReviews([...tempReviews]);
    // }, 500) as any;
    // setTime(timeoutId as number);
  };
  const manageCatalogues = (
    key: string,
    value: CatalogueValue,
    item: CatalogueItems
  ) => {
    switch (key) {
      case "template":
        setTemplateList(value as ITemplate[]);
        setSelectedCatalogue({
          ...selectedCatalogue,
          [key]: item as ITemplate,
        });
        break;
      case "actor":
        setActorList(value as IActor[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IActor });
        break;
      case "music":
        setMusicList(value as IMusic[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IMusic });
        break;
      case "voice":
        setVoiceList(value as IVoice[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IVoice });
        break;
      case "media":
        setMediaList(value as IMedia[]);
        setSelectedCatalogue({ ...selectedCatalogue, [key]: item as IMedia[] });
        break;
      default:
        break;
    }
    setShowSeeAll({ ...showSeeAll, show: false });
  };
  const changeProductData = (key: string, value: string, index: number) => {
    const tempData = [...productData];
    tempData[index] = { ...tempData[index], [key]: value };
    setProductData([...tempData]);
  };
  const manageProductData = (index: number | undefined) => {
    const data = [...productData];
    index || index === 0
      ? data.splice(index, 1)
      : data.push({ key: "", value: "" });
    setProductData([...data]);
  };

  return (
    <>
      {showSeeAll.show ? (
        <Rows spacing="1u" align="stretch">
          <SeeAllView
            details={showSeeAll}
            changeView={handleView}
            manageCatalogue={manageCatalogues}
          />
        </Rows>
      ) : (
        <div className={styles.scrollContainer}>
          {/* <Rows align="start" spacing="0">
            <Columns spacing="1u" align="center" alignY="center">
              <Column>
                <Button
                  icon={() => <ChevronLeftIcon />}
                  variant="tertiary"
                  onClick={() => changeView("type-view")}
                />
              </Column>
              <Column width="content">
                <Title size="small">{`Create ${mode?.label} video`}</Title>
              </Column>
            </Columns>
          </Rows> */}
          <Grid columns={1}>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <TextInput
                    onChange={(value: string) =>
                      changeFormDetails("title", value)
                    }
                    placeholder="Enter product title"
                    {...props}
                    value={formDetails.title}
                  />
                )}
                error={errorMessage.title}
                label="Title*"
              />
              <Box paddingBottom="0.5u" />
            </Rows>
            <Rows spacing="0">
              <FormField
                control={(props) => (
                  <NumberInput
                    // max={1000}
                    min={1}
                    onChange={(value: number) =>
                      changeFormDetails("price", value)
                    }
                    {...props}
                    value={formDetails.price}
                  />
                )}
                label="Price"
              />
              <Box paddingBottom="0.5u" />
            </Rows>
            <Rows spacing="0">
              <FormField
                control={(props) => (
                  <NumberInput
                    // max={1000}
                    min={1}
                    onChange={(value: number) =>
                      changeFormDetails("recommended_retail_price", value)
                    }
                    {...props}
                    value={formDetails.recommended_retail_price}
                  />
                )}
                label="Recommended retail price"
              />
              <Box paddingBottom="0.5u" />
            </Rows>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <TextInput
                    onChange={(value: string) => {
                      changeFormDetails("product_category", value);
                    }}
                    placeholder="Enter product category"
                    {...props}
                    value={formDetails.product_category}
                  />
                )}
                label="Category"
              />
              <Box paddingBottom="0.5u" />
            </Rows>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <TextInput
                    onChange={(value: string) =>
                      changeFormDetails("shop_url", value)
                    }
                    placeholder="Enter URL of the product page on the shop's website."
                    {...props}
                    value={formDetails.shop_url}
                  />
                )}
                label="URL"
              />
              <Box paddingBottom="0.5u" />
            </Rows>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <MultilineInput
                    footer={<CharacterCountDecorator max={100} />}
                    autoGrow
                    onChange={(value: string) =>
                      changeFormDetails("short_description", value)
                    }
                    placeholder="Enter short description"
                    {...props}
                    value={formDetails.short_description}
                  />
                )}
                label="Short description*"
                error={errorMessage.short_description}
              />
              <Box paddingBottom="0.5u" />
            </Rows>
            <Rows spacing="0.5u">
              <FormField
                control={(props) => (
                  <MultilineInput
                    onChange={(value: string) =>
                      changeFormDetails("long_description", value)
                    }
                    placeholder="Enter brief description"
                    minRows={3}
                    {...props}
                    value={formDetails.long_description}
                  />
                )}
                label="Long description*"
                error={errorMessage.long_description}
              />
              <Box paddingBottom="1u" />
            </Rows>
            <Accordion>
              <>
                <Rows spacing="0.5u">
                  <Text variant="bold">Product review</Text>
                  {reviews.map((review: string, index: number) => (
                    <Columns spacing="1u" key={index}>
                      <Column width="3/4">
                        <FormField
                          control={(props) => (
                            <TextInput
                              onChange={(value: string) =>
                                changeReview(value, index)
                              }
                              placeholder="Enter product review"
                              {...props}
                              value={review}
                            />
                          )}
                          label=""
                        />
                      </Column>
                      <Column>
                        <Button
                          variant="tertiary"
                          onClick={() => manageReview(undefined)}
                          icon={() => <PlusIcon />}
                        />
                      </Column>
                      {reviews.length > 1 && (
                        <Column>
                          <Button
                            variant="tertiary"
                            onClick={() => manageReview(index)}
                            icon={() => <TrashIcon />}
                          />
                        </Column>
                      )}
                    </Columns>
                  ))}
                  <Box paddingBottom="0.5u" />
                </Rows>
                <Rows spacing="0.5u">
                  <Text variant="bold">Data</Text>
                  {productData.map((pdata: IProductData, index: number) => (
                    <Columns spacing="1u" key={index}>
                      <Column width="2/5">
                        <FormField
                          control={(props) => (
                            <TextInput
                              onChange={(value: string) =>
                                changeProductData("key", value, index)
                              }
                              placeholder="Key"
                              {...props}
                              value={pdata.key}
                            />
                          )}
                          label=""
                        />
                      </Column>
                      <Column width="2/5">
                        <FormField
                          control={(props) => (
                            <TextInput
                              onChange={(value: string) =>
                                changeProductData("value", value, index)
                              }
                              placeholder="Value"
                              {...props}
                              value={pdata.value}
                            />
                          )}
                          label=""
                        />
                      </Column>
                    </Columns>
                  ))}
                </Rows>
              </>
            </Accordion>
            <Box paddingBottom="1u" />
          </Grid>
          <Catalogue
            currentCatalogue={selectedCatalogue}
            changeCatalogue={handleChangeCatalogue}
            openSeeAll={handleView}
            create={createVideo}
            showMedia={true}
            actorList={actorList}
            templateList={templateList}
            voiceList={voiceList}
            musicList={musicList}
            mediaList={mediaList}
            getMedias={getAllMedia}
            loader={loader}
            changeView={() => manageView("list-view")}
          />
        </div>
      )}
    </>
  );
};

export default ProductMode;
