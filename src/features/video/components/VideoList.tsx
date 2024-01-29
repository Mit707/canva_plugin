import React from "react";
import { addNativeElement } from "@canva/design";
import { upload } from "@canva/asset";
import styles from "styles/video.css";
import clsx from "clsx";
import rootStyle from "styles/components.css";
import HttpService from "src/shared/services/Http.service";

const dtaa = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

const VideoList = () => {
  const deleteVideo = (id: string) => {
    HttpService.deleteRequest(id)
      .then((res) => {
        if (!res.is_error) {
        }
      })
      .catch((error) => {
        console.log("🚀 ~ error:", error);
      });
  };
  const onClick = async () => {
    const result = await upload({
      type: "VIDEO",
      id: "uniqueIdGoesHere",
      mimeType: "video/mp4",
      url: "https://www.canva.dev/example-assets/video-import/video.mp4",
      thumbnailImageUrl:
        "https://www.canva.dev/example-assets/video-import/thumbnail-image.jpg",
      thumbnailVideoUrl:
        "https://www.canva.dev/example-assets/video-import/thumbnail-video.mp4",
    });

    await addNativeElement({
      type: "VIDEO",
      ref: result.ref,
    });
  };
  return (
    <div className={styles.container}>
      <div
        className={clsx(rootStyle.scrollContainer, styles.listPadding)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "8px",
          paddingBottom: "var(--ui-kit-space-3)",
        }}
      >
        {dtaa.map((video) => (
          <div
            key={video}
            style={{
              //   aspectRatio: "16/9",
              background: "hsla(0,0%,100%,.07)",
              borderRadius: "4px",
              cursor: "pointer",
              position: "relative",
              paddingBottom: "0px",
            }}
          >
            <div
              style={{
                padding: "4px",
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={onClick}
            >
              <img
                src="https://files.heygen.ai/aws_pacific/avatar_tmp/d112900cb4a44103a9fd12dd593743f5/47f620a852a9451099d9b4dbec8aadf3.jpeg?Expires=1706162076&amp;Signature=BwWlp6GdQl8K35GIQ1vpOj0edtEJ5Xt-1ERG8AQ~FrpyOUU54cJ26rI4rc6rfDN4GK5nbO6DBls8OHSpUzEJQjPZ6NL42WYzTpNsm4JcaGd5PF1QHTNnRRdOvCEgrN63XaOPwtF1HYVO-bRO3v0pq~C8xOKtw9efhxk~HqMXlgPEbevu6rR9MdJrtHSobhrk6fYLHhnKNWta2nJrUsEwNo1wwgkoGQU6h8cr9Gtei0mrprFP1hyYzP-fhWa4t9yQCKmO023ViXiixHDLp~1tpVmBhpQV8vkHSSJQM~Y4ge1rGIuCek6ZY0ReZcjuVfB0byYFRo68tarkVHlzKwpFwg__&amp;Key-Pair-Id=K49TZTO9GZI6K"
                alt="thumbnail"
                style={{
                  clipPath: "circle()",
                  objectFit: "cover",
                  height: "80px",
                  width: "80px",
                }}
              />
            </div>
            <div
              style={{
                background: "rgba(13,18,22,.6)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                bottom: "4px",
                color: "hsla(0,0%,100%,.9)",
                fontSize: "12px",
                fontWeight: "700",
                height: "18px",
                left: "4px",
                lineHeight: "16px",
                opacity: 1,
                padding: "0 8px",
                position: "absolute",
                transition: "opacity .15s ease",
              }}
            >
              4.0s
            </div>
            <div
              onClick={() => deleteVideo("video_id")}
              style={{
                background: "rgba(13,18,22,.6)",
                border: "4px",
                cursor: "pointer",
                top: "3px",
                transition: "opacity .15s ease,top .15s ease",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                height: "32px",
                right: "3px",
                width: "28px",
                opacity: 1,
                borderRadius: 10,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 2h2a3 3 0 0 1 3 3h4.25a.75.75 0 0 1 0 1.5H19V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6.5H3.75a.75.75 0 0 1 0-1.5H8a3 3 0 0 1 3-3ZM6.5 6.5h11V18a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 18V6.5Zm8-1.5h-5A1.5 1.5 0 0 1 11 3.5h2A1.5 1.5 0 0 1 14.5 5ZM9.25 9h1.5v8h-1.5V9Zm5.5 0h-1.5v8h1.5V9Z"
                  fill="#fff"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
