# javascript-convenience-store-precourse
## 기능 설명
### 본 프로그램은 사용자의 입력을 통해 상품 가격, 수량, 할인 및 재고 상황을 고려하여 최종 결제 금액을 계산하고, 결제 정보를 영수증으로 출력하는 편의점 결제 시스템입니다.

## 기능 구현 목록 
### 0. 출력 요구 사항 적용
### 1. 입력 값 검증
    - 사용자 입력에 대해 유효성 검사를 실시합니다.
    - 형식이 올바르지 않거나 존재하지 않는 상품, 재고 수량 초과 등 잘못된 입력에는 "[ERROR]" 메시지를 출력하고 재입력을 요청합니다.
### 2. 상품 목록 및 행사 목록 불러오기
    - 상품 및 프로모션 정보를 public/products.md와 public/promotions.md 파일에서 읽어옵니다.
    - 상품명, 가격, 프로모션 여부, 재고 수량 등을 출력하여 고객에게 안내합니다.
### 3. 결제 시스템 구현
    - 사용자로부터 입력받은 상품명과 수량을 기반으로 총구매액을 계산합니다.
    - 총구매액은 상품별 가격과 수량을 곱하여 산출되며, 프로모션 및 멤버십 할인 정책을 적용하여 최종 결제 금액을 계산합니다.
### 4. 프로모션 할인 적용
    - 오늘 날짜가 프로모션 기간 내에 포함된 경우에만 할인을 적용합니다.
    - N개 구매 시 1개 무료 증정 형태의 프로모션(1+1, 2+1)을 적용하며, 프로모션 재고가 우선적으로 차감됩니다.
    - 프로모션 혜택을 받기 위해 필요한 수량을 사용자에게 추가 안내할 수 있으며, 프로모션 재고가 부족할 경우 정가로 결제를 진행할지 확인합니다.
### 5. 멤버십 할인 적용
    - 프로모션 미적용 금액의 30%를 할인하며, 최대 할인 한도는 8,000원으로 설정합니다.
    - 멤버십 할인 적용 여부를 사용자가 선택할 수 있도록 안내합니다.
### 6. 영수증 출력
    - 구매 상품 내역, 증정 상품 내역, 총 구매액, 행사 할인, 멤버십 할인, 최종 결제 금액을 포함한 영수증을 정렬하여 출력합니다.
### 7. 추가 구매 여부
    - 구매 후 추가 구매를 원할 경우 업데이트된 재고 상태를 확인하고 다시 구매를 진행할 수 있도록 안내합니다.
### 8. 테스트 코드 작성
    - Jest를 이용하여 각 기능이 정상적으로 작동하는지 테스트합니다.
    = 테스트 도구 사용법에 익숙해지기 위해 Using Matchers, Testing Asynchronous Code, test.each() 및 describe.each()를 학습 후 적용합니다.