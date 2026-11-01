# Only the version is filled in by installer/linux/build-rpm.sh; everything else is fixed.
%global debug_package %{nil}
# The published executable is already a self-contained, single-file binary.
%global __os_install_post %{nil}

Name:           antibot
Version:        @VERSION@
Release:        1%{?dist}
Summary:        VRChat anti-bot tooling with a live log viewer

License:        MIT
URL:            https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot
Source0:        %{name}-%{version}.tar.gz

BuildArch:      x86_64

# What the self-contained .NET runtime and the embedded Photino browser need at run time.
Requires:       gtk3
Requires:       webkit2gtk4.1
Requires:       libnotify
Requires:       libicu
Requires:       openssl-libs
Requires:       zlib
Requires:       krb5-libs
Requires:       fontconfig
Requires:       freetype

%description
AntiBot reads the log VRChat already writes, shows who is in your instance,
and scores every user who joins. Above a threshold you choose it can block
the user, turn their avatar interactions off, hide their chat box, or press
VRChat's panic button over OSC.

Everything stays on this machine except the VRChat API calls.

%prep
%autosetup -n %{name}-%{version}

%install
install -Dpm 0755 AntiBot %{buildroot}/opt/AntiBot/AntiBot
install -Dpm 0644 antibot.desktop %{buildroot}%{_datadir}/applications/antibot.desktop
install -Dpm 0644 antibot.png %{buildroot}%{_datadir}/icons/hicolor/256x256/apps/antibot.png

mkdir -p %{buildroot}%{_bindir}
ln -s /opt/AntiBot/AntiBot %{buildroot}%{_bindir}/antibot

%post
# The desktop entry and the icon are new; refresh the caches that hold them.
update-desktop-database >/dev/null 2>&1 || :
gtk-update-icon-cache --quiet %{_datadir}/icons/hicolor >/dev/null 2>&1 || :
touch --no-create %{_datadir}/icons/hicolor >/dev/null 2>&1 || :

%postun
update-desktop-database >/dev/null 2>&1 || :
gtk-update-icon-cache --quiet %{_datadir}/icons/hicolor >/dev/null 2>&1 || :
touch --no-create %{_datadir}/icons/hicolor >/dev/null 2>&1 || :

%files
/opt/AntiBot/AntiBot
%{_bindir}/antibot
%{_datadir}/applications/antibot.desktop
%{_datadir}/icons/hicolor/256x256/apps/antibot.png

%changelog
* Sun Nov 02 2026 yukiyosanako <yukiyosanako@users.noreply.github.com> - @VERSION@-1
- Package the published AntiBot build.
