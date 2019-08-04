context("Actions", () => {
  beforeEach(() => {
    cy.visit(
      "/eftalou_molivos/villas_molivos_castle.htm?view=prices&transport=vl"
    );
  });

  describe("Price", () => {
    it("should be 705", () => {
      cy.get(".acco-price-block").should("be.visible");

      cy.get(".acco-container.first")
        .first()
        .find(".date")
        .contains("16 sep")
        .each(element => {
          const dateEl = element[0];
          const dateNodes = dateEl.closest(".acco-container").children;
          const dateElIndex = Array.from(dateNodes).findIndex(node =>
            Array.from(node.children).includes(dateEl)
          );

          cy.get(".acco-container .acco")
            .contains("2 Pers ")
            .closest(".acco-container")
            .each(element => {
              const accoNodes = element[0].children;
              const accoSingleNode = Array.from(accoNodes)[dateElIndex];
              const priceStr = accoSingleNode.querySelector(".fact").textContent;
              const match = priceStr.trim().match(/\d+/);
              const price = parseInt(match[0], 10);

              expect(price).to.equal(705);
            });
        });
    });
  });
});
