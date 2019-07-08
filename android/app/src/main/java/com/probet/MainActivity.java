package com.xend.food;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Xend Food";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // SplashScreen.show(this);  // here
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        // data.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
}
}
