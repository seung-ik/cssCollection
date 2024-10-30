import cv2
import numpy as np
import tensorflow as tf

# 이미지 불러오기
image = cv2.imread('./img.png')

# 이미지를 흑백으로 변환
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# # 코너 검출 알고리즘을 사용하여 바둑판의 꼭짓점 찾기
# corners = cv2.goodFeaturesToTrack(gray, 100, 0.01, 10)

# # 찾은 코너를 표시
# for corner in corners:
#     x, y = corner.ravel()
#     cv2.circle(image, (x, y), 3, (255, 0, 0), -1)

# 결과 이미지 출력
cv2.imshow('Board Recognition', image)
cv2.waitKey(0)
cv2.destroyAllWindows()