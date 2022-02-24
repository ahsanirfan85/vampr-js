class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let distance = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      distance++;
    }   
    
    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let comparisonVampireDistance = vampire.numberOfVampiresFromOriginal

    if (comparisonVampireDistance > this.numberOfVampiresFromOriginal) {
      return true;
    }

    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    this.numberOfVampiresFromOriginal;
    vampire.numberOfVampiresFromOriginal;
    let thisVampiresAncestors = [];
    let otherVampiresAncestors = [];
    let commonAncestors = [];
    let nameOfClosestCommonAncestor = '';
    let closestCommonAncestor = {};
    let currentVampire = this;

    if (this.name === "root") {
      return this;
    }

    if (vampire.name === "root") {
      return vampire;
    }

    if (this.name === vampire.name) {
      return this;
    }

    let currentVampire2 = this;

    while (currentVampire2.creator) {
      if (currentVampire2.name === vampire.name) {
        return vampire;
      }
      currentVampire2 = currentVampire2.creator;
    }

    let currentVampire3 = vampire;

    while (currentVampire3.creator) {
      if (currentVampire3.name === this.name) {
        return this;
      }
      currentVampire3 = currentVampire3.creator;
    }
    
    for (let i = 0; i < this.numberOfVampiresFromOriginal; i++) {
      thisVampiresAncestors.push(currentVampire.creator.name);
      currentVampire = currentVampire.creator;
    }

    currentVampire = vampire;
    for (let i = 0; i < vampire.numberOfVampiresFromOriginal; i++) {
      otherVampiresAncestors.push(currentVampire.creator.name);
      currentVampire = currentVampire.creator;
    }

    for (let i = 0; i < thisVampiresAncestors.length ; i++) {
      for (let j = 0; j < otherVampiresAncestors.length; j++) {
        if (thisVampiresAncestors[i] === otherVampiresAncestors[j]) {
          commonAncestors.push(thisVampiresAncestors[i]);
        }
      }
    }
    
    nameOfClosestCommonAncestor = commonAncestors[0];

    currentVampire = this;

    for (let i = 0; i < thisVampiresAncestors.length; i++) {
      if (currentVampire.creator.name === nameOfClosestCommonAncestor) {
        closestCommonAncestor = currentVampire.creator;
      }
      currentVampire = currentVampire.creator;
    }
    return closestCommonAncestor;
    
  }
}

module.exports = Vampire;

