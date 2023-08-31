import React from 'react';

function Footer() {
    return (
        <div>
            <div>
                <footer className="main-footer">
                    <strong>Copyright © 2023 Aviculture.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                        <b>PFE</b> 2023
                    </div>
                </footer>
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>
                {/* /.control-sidebar */}
            </div>
        </div>
    );
}

export default Footer;

