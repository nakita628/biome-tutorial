function a() {
  switch (condition) {
    case 'a': {
      try {
        console.log('a');
        return;
      } finally {
        break;
      }
    }
    case 'b': {
      console.log('b');
    }
  }
}
